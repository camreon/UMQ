from __future__ import unicode_literals

from flask import Flask, render_template_string
from flask_injector import FlaskInjector
from flask_cors import CORS
from injector import threadlocal
from app.config import get_env_config
from app.db import db
from app.views import bp
from app.stream_service import StreamService, MockStreamService


def create_app(test_config=None):
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)

    cors = CORS(app, origins=["http://localhost:3000", "https://bigplaylist.club/"])
    env = get_env_config()

    if test_config:
        # load the test config if passed in
        app.config.update(test_config)
    else:
        # load the instance config, if it exists, when not testing
        app.config.from_mapping(
            SQLALCHEMY_DATABASE_URI=env['sqlalchemy_database_uri'],
            SQLALCHEMY_TRACK_MODIFICATIONS=False,
            SECRET_KEY=env['secret_key'],
            ECOSYSTEM=env['ecosystem'],
            DEBUG=env['debug']
        )

    db.init_app(app)

    app.register_blueprint(bp)

    @app.route('/')
    def health_check():
        return render_template_string('ok')

    def bind_stream_service(binder):
        binder.bind(
            StreamService,
            to=create_stream_service(test_config),
            scope=threadlocal
        )

    FlaskInjector(app=app, modules=[bind_stream_service])

    return app


def create_stream_service(test_config):
    if test_config:
        return MockStreamService()
    else:
        return StreamService()
