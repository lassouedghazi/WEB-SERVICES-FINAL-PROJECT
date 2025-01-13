import os

class Config:
    
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_very_secret_key'
    
    
    basedir = os.path.abspath(os.path.dirname(__file__))  
    
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{os.path.join(basedir, "instance", "users.db")}'
    
   
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'another_very_secret_key'
    
    
    JWT_ACCESS_TOKEN_EXPIRES = os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') or 3600  

    CSRF_ENABLED = True
    LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
