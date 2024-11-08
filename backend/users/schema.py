import graphene
from graphql_auth import mutations
from graphql_auth.queries import UserQuery, MeQuery
    
class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    
    refresh_token = mutations.RefreshToken.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()

class Query(UserQuery, MeQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)