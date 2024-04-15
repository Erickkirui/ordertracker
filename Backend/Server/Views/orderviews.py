import re
from flask_restful import Resource
from flask import request
from Server.Models.orders import Orders
from datetime import datetime, date

from app import db


class ViewOrdersByPriority(Resource):
    def get(self, priority):
        # Filter orders by priority
        orders = Orders.query.filter_by(priority=priority).all()
        
        if not orders:
            return {'message': f'No {priority} priority orders'}, 404
        
        # Convert orders to JSON format
        order_list = [{'id': order.id, 
                       'customer_name': order.customer_name, 
                       'phone_number': order.phone_number,
                       'priority': order.priority, 
                       'product_name': order.product_name,
                       'created_at': order.created_at.strftime("%Y-%m-%d %H:%M:%S")} for order in orders]
        
        return {'orders': order_list}, 200

class ViewHighPriorityOrders(ViewOrdersByPriority):
    def get(self):
        return super().get('high')

class ViewMediumPriorityOrders(ViewOrdersByPriority):
    def get(self):
        return super().get('medium')

class ViewLowPriorityOrders(ViewOrdersByPriority):
    def get(self):
        return super().get('low')
    
class ViewAllOrders(Resource):
    def get(self):
        orders = Orders.query.all()
        order_list = [{'id': order.id, 
                       'customer_name': order.customer_name, 
                       'phone_number': order.phone_number,
                       'priority': order.priority, 
                       'product_name': order.product_name,
                       'created_at': order.created_at.strftime("%Y-%m-%d %H:%M:%S")} for order in orders]
        return {'orders': order_list} ,200
    

class AddOrder(Resource):
    def post(self):
        data = request.json
        new_order = Orders(customer_name=data.get('customer_name'), 
                           phone_number=data.get('phone_number'),
                           priority=data.get('priority'), 
                           product_name=data.get('product_name'))
        
        db.session.add(new_order)
        db.session.commit()
        return {'message': 'Order added successfully', 'id': new_order.id}, 201
    
class OrderbyId(Resource):
    def get(self, order_id):
        order = Orders.query.get(order_id)
        if order:
            return {'id': order.id, 'customer_name': order.customer_name, 'phone_number': order.phone_number,
                            'priority': order.priority, 'product_name': order.product_name,
                            'created_at': order.created_at.strftime("%Y-%m-%d %H:%M:%S")} , 200
        else:
            return {'message': 'Order not found'}, 404
    
    def put(self, order_id):
        data = request.json
        order = Orders.query.get(order_id)
        if order:
            order.customer_name = data.get('customer_name', order.customer_name)
            order.phone_number = data.get('phone_number', order.phone_number)
            order.priority = data.get('priority', order.priority)
            order.product_name = data.get('product_name', order.product_name)
            db.session.commit()
            return {'message': 'Order updated successfully'}, 200
        else:
            return {'message': 'Order not found'}, 404
    
    def delete(self, order_id):
        order = Orders.query.get(order_id)
        if order:
            db.session.delete(order)
            db.session.commit()
            return {'message': 'Order deleted successfully'}, 200
        else:
            return {'message': 'Order not found'}, 404
