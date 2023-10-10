import sys
from environs import Env, EnvError

CONNECTION_STRING_FORMAT = 'postgresql+psycopg2://%s:%s@%s:%s/%s'

env = Env()
env.read_env()


def get_db_url():
    return env.str('DATABASE_URL')


def get_env_config():
    env_config = {}

    try:
        env_config.update({
            'sqlalchemy_database_uri': get_db_url(),
            'secret_key': env.str('SECRET_KEY'),
            'ecosystem': env.str('ECOSYSTEM', 'dev'),
            'debug': env.bool('DEBUG', False)
        })
    except EnvError as e:
        # TODO:
        # log.error('Application startup failed: {}'.format(e.message))
        # log.debug(e)
        sys.exit(repr(e))

    return env_config
