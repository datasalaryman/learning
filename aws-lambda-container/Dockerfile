FROM public.ecr.aws/lambda/nodejs:20

COPY index.mjs package.json ${LAMBDA_TASK_ROOT}

RUN npm install "@solana/web3.js" dotenv

CMD [ "index.handler" ]