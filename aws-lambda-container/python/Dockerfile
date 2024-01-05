FROM public.ecr.aws/lambda/python:3.11

# Copy requirements.txt
COPY .env requirements.txt ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements.txt

# Copy function code
COPY controller/* ${LAMBDA_TASK_ROOT}/controller/
COPY schema/* ${LAMBDA_TASK_ROOT}/schema/

COPY main.py ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "main.handler" ]