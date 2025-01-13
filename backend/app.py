# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from backend.models import db, User, LostDeviceReport, TechnicalGlitch, UnauthorizedCarReport  # Import all necessary models
from backend.config import Config
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Apply configuration from config.py
app.config.from_object(Config)

# Initialize the database with SQLAlchemy
db.init_app(app)

# Initialize JWT Manager
jwt = JWTManager(app)

# Home Route
@app.route('/')
def home():
    return jsonify({"message": "Welcome"})

# Register Route
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data['username']
        email = data['email']
        password = data['password']
        confirm_password = data['confirm_password']

        # Check if passwords match
        if password != confirm_password:
            return jsonify({"error": "Passwords do not match!"}), 400

        # Hash the password
        hashed_password = generate_password_hash(password)

        # Check if the email already exists using SQLAlchemy
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"error": "Email already exists!"}), 400

        # Create a new user and add to the database
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Login Route
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        # Check if user exists using SQLAlchemy
        user = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            # Create JWT Token
            access_token = create_access_token(identity=user.email)
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"error": "Invalid credentials!"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Profile Route (GET) - Fetch user profile
@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_email = get_jwt_identity()
        
        # Fetch the user from the database
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            return jsonify({"error": "User not found!"}), 404

        return jsonify({
            "user_id": user.id,
            "username": user.username,
            "email": user.email
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Lost Device Reporting Route
@app.route('/report-lost-device', methods=['POST'])
@jwt_required()
def report_lost_device():
    try:
        current_user_email = get_jwt_identity()
        data = request.get_json()

        # Validate input
        required_fields = ['device_id', 'first_name', 'last_name', 'national_id', 'description']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field.replace('_', ' ').title()} is required!"}), 400
        
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            return jsonify({"error": "User not found!"}), 404
        
        report = LostDeviceReport(
            user_id=user.id,
            device_id=data['device_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            national_id=data['national_id'],
            description=data['description']
        )
        
        db.session.add(report)
        db.session.commit()

        return jsonify({"message": "Lost toll device reported successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to report technical glitches
@app.route('/report-technical-glitch', methods=['POST'])
@jwt_required()
def report_technical_glitch():
    try:
        data = request.get_json()
        
        user_id = get_jwt_identity()  # Get current user's ID from JWT

        # Validate input data
        device_id = data.get('device_id')
        issue_type = data.get('issue_type')
        description = data.get('description')

        if not device_id or not issue_type or not description:
            return jsonify({"error": "All fields are required."}), 400

        # Create a new technical glitch report
        new_report = TechnicalGlitch(
            user_id=user_id,
            device_id=device_id,
            issue_type=issue_type,
            description=description
        )

        db.session.add(new_report)
        db.session.commit()

        return jsonify({"message": "Technical glitch reported successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to report unauthorized cars
@app.route('/report-unauthorized-car', methods=['POST'])
@jwt_required()
def report_unauthorized_car():
    try:
        data = request.get_json()
        
        user_id = get_jwt_identity()  # Get current user's ID from JWT

        # Validate input data
        vehicle_id = data.get('vehicle_id')
        description = data.get('description')
        location = data.get('location')  # Required: where the incident occurred
        timestamp = data.get('timestamp')  # Optional: time of the incident

        if not vehicle_id or not description or not location:
            return jsonify({"error": "Vehicle ID, description, and location are required."}), 400
        
        # Convert timestamp string to datetime object if provided
        if timestamp:
            timestamp = datetime.fromisoformat(timestamp)  # Convert string to datetime object
        else:
            timestamp = datetime.utcnow()  # Use current time if not provided

        # Create a new unauthorized car report
        new_report = UnauthorizedCarReport(
            user_id=user_id,
            vehicle_id=vehicle_id,
            description=description,
            location=location,
            timestamp=timestamp
        )

        db.session.add(new_report)
        db.session.commit()

        return jsonify({"message": "Unauthorized car reported successfully!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)

