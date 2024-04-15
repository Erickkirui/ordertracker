from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from sqlalchemy.orm import validates
from sqlalchemy import Enum

from app import db

class Orders(db.Model):
    __tablename__ = "orders"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_name = db.Column(db.String(20), nullable=True)
    phone_number = db.Column(db.String(15), nullable=False)
    priority = db.Column(Enum('high', 'medium', 'low', name='priority_enum'), nullable=False)
    product_name = db.Column(db.String(50), nullable=False)  # Adjust the length according to your needs
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        assert phone_number.isdigit(), "Phone number must contain only digits."
        assert len(phone_number) >= 10, "Phone number must be at least 10 digits long."
        return phone_number
    
    def __repr__(self):
        return f"<Order id={self.id}, customer={self.customername}, phone_number={self.phone_number}, priority={self.priority}, product_name={self.product_name}>"
