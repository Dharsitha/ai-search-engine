from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        error_code = getattr(exc, 'default_code', 'error')
        message = response.data
        if isinstance(message, dict):
            # Extract first readable message if possible
            first_val = next(iter(message.values()), '')
            if isinstance(first_val, list) and len(first_val) > 0:
                first_msg = str(first_val[0])
            else:
                first_msg = str(first_val)
        elif isinstance(message, list) and len(message) > 0:
            first_msg = str(message[0])
        else:
            first_msg = str(message)

        response.data = {
            'error': {
                'code': error_code,
                'message': first_msg or str(exc),
                'details': response.data
            }
        }
    return response
