import os

class Config():
    DEBUG = False
    TESTING = False
    CSRF_ENABLE = True
    SECTRET_KEY = "Soweto@awsum2023"

class Development(Config):
    DEBUG = True
    TESTING = True

class Production(Config):
    DEBUG = False
    TESTING = False

class Testing(Config):
    DEBUG = True
    TESTING = True

# configurations
app_config = {
    "development" : Development(),
    "testing" : Testing(),
    "production" : Production()
}

