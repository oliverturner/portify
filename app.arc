@app
portify

@create
autocreate true

@http
get /login
get /auth
post /logout

get /api/top

# @aws
# profile default
# region us-west-1

@sandbox-startup
echo "hello"