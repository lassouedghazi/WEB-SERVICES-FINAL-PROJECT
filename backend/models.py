from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

class LostDeviceReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    device_id = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    national_id = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<LostDeviceReport {self.device_id} by User {self.user_id}>'

class TechnicalGlitch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    device_id = db.Column(db.String(100), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(50), default='Pending')

    def __repr__(self):
        return f'<TechnicalGlitch {self.id} by User {self.user_id}>'

class UnauthorizedCarReport(db.Model):
    __tablename__ = 'unauthorized_car_report' 

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vehicle_id = db.Column(db.String(100), nullable=False) 
    description = db.Column(db.Text, nullable=True)  
    location = db.Column(db.String(255), nullable=False)  
    timestamp = db.Column(db.DateTime, default=datetime.utcnow) 
    status = db.Column(db.String(50), default='Pending') 

    def __repr__(self):
        return f'<UnauthorizedCarReport {self.id} by User {self.user_id}>>'

