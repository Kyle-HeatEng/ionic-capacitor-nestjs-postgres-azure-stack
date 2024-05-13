# CanvasConnect
A place users can share there favouirte artist and art pieces. 
> developing to test out alternative cloud solutions + ionic with capacitor as a solution to native applications
### Plan of action:
- [x] Set up a SQL database using Azure SQL Server + Azure SQL Database + ORM of prisma
- [x] SQL table User
#### User table
```sql
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    hashed_password TEXT
);

CREATE INDEX idx_user_id ON "User" (id);
```
- [x] SQL table Canvas
#### Canvas table
```sql
CREATE TABLE Canvas (
    id SERIAL PRIMARY KEY,
    _user_id INTEGER REFERENCES "User" (id)
);

CREATE INDEX idx_canvas_id ON Canvas (id);
CREATE INDEX idx_canvas_user_id ON Canvas (_user_id);
```
- [x] SQL table Piece
#### Piece Table
```sql
CREATE TABLE Piece (
    id SERIAL PRIMARY KEY,
    _created_at_canvas_id INTEGER REFERENCES Canvas (id),
    total_likes INTEGER
);

CREATE INDEX idx_piece_id ON Piece (id);
```
- [x] Set up a nestjs application 
- [x] Create Github actions to deploy nestjs application to Azure app services
- [ ] Deploy nestjs application to Azure app services
####  Auth Services
- [x] Basic auth with JWT + email + password
#### Email Services
#### Canvas Services
- [x] Create a authenticated route to view canvas

## Ionic application 
- [x] Set up ionic mobile client
- [ ] Build IOS and Android applications using capacitor
- [ ] Create Github actions to deploy ionic application to Azure Blob Storage
- [ ] Deploy web application build to Azure blob storage and configure CDN with Azure CDN

#### Required routes
- [x] auth/register
- [x] auth/login
- [ ] canvas/:id/account
- [ ] canvas/:id/feed

#### Required pages
- [x] Register page
- [x] Login page
- [ ] Canvas Account page
- [ ] Canvas Feed page

#### Canvas requirments
- User can have multiple alt-canvas
- On registeration a canvas is generated for the user
- When first login user will be routed to this canvas
- A feature to create new canvas is currently beyond the scope of this task 
however, this feature will allow users to store multiple style of canvas to
allow the user to express different emotions.
- User canvas has a route to view there own art work
- User canvas has a route to view there other users artwork.
- A feature to allow users to filter artwork by tags is beyond the scope fo this 
task however, this feature will allow users to express within the application
a priefience for the works they wish to view.
- [x] Register form
- [ ] Email services
