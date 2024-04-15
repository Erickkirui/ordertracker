from flask import Blueprint
from flask_restful import Api

from Server.Views.orderviews import ViewAllOrders,AddOrder,OrderbyId,ViewHighPriorityOrders,ViewMediumPriorityOrders,ViewLowPriorityOrders

api_endpoints = Blueprint('auth', __name__, url_prefix='/api')
api = Api(api_endpoints)


api.add_resource(ViewAllOrders , '/orders')
api.add_resource(AddOrder , '/neworder')
api.add_resource(OrderbyId, '/orders/<int:order_id>')

api.add_resource(ViewHighPriorityOrders, '/highpriority')
api.add_resource(ViewMediumPriorityOrders, '/midpriority')
api.add_resource(ViewLowPriorityOrders, '/lowpriority')

