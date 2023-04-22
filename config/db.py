from sqlalchemy import create_engine, MetaData

engine = create_engine("mysql+mysqlconnector://root:tauqir786@localhost:3306/fastapi_react")
meta = MetaData()
conn = engine.connect()