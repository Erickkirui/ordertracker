from app import create_app
from config import app_config

config_name = "production"
app = create_app(app_config)

if __name__ == '__main__':
    app.run(debug=True , port=5000)