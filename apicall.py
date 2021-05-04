from flask import Flask, jsonify
from flask_restful import Resource, Api, reqparse
import requests
import json

# creating the flask app
app = Flask(__name__)
api = Api(app)


def get_data(url, type, header, body):
    data = None
    if type == "POST":
        data = requests.post(url, data=json.dumps(body), headers=header).json()
    elif type == "GET":
        data = requests.get(url)

    return data if not isinstance(data, list) else {"data": data}


class ApiCall(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "url",
        type=str
    )
    parser.add_argument(
        "type",
        type=str
    )
    parser.add_argument(
        "header",
        type=dict
    )
    parser.add_argument(
        "body",
        type=dict
    )

    def post(self):
        args = ApiCall.parser.parse_args()
        data = get_data(**args)
        return jsonify(data)


api.add_resource(ApiCall, '/apicall')

if __name__ == '__main__':
    app.run(debug=True)
