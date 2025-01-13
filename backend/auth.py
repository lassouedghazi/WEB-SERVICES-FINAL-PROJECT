from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity
from backend.models import db, User  
from sqlalchemy.exc import IntegrityError


def register_user():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']

    
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match!"}), 400

    
    hashed_password = generate_password_hash(password)

    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "Email already exists!"}), 400

    
    new_user = User(username=username, email=email, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Failed to add user, please try again later!"}), 500

    return jsonify({"message": "User registered successfully!"}), 201


def authenticate_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
       
        access_token = create_access_token(identity=user.email)
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials!"}), 400


def get_user_profile():
    current_user_email = get_jwt_identity()  
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        return jsonify({"username": user.username, "email": user.email}), 200
    else:
        return jsonify({"error": "User not found!"}), 404

