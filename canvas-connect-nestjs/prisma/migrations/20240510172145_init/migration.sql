BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [hashedPassword] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Canvas] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    CONSTRAINT [Canvas_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Piece] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAtCanvasId] INT NOT NULL,
    [totalLikes] INT NOT NULL,
    CONSTRAINT [Piece_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_user_id] ON [dbo].[User]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_canvas_id] ON [dbo].[Canvas]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_canvas_user_id] ON [dbo].[Canvas]([userId]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [idx_piece_id] ON [dbo].[Piece]([id]);

-- AddForeignKey
ALTER TABLE [dbo].[Canvas] ADD CONSTRAINT [Canvas_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Piece] ADD CONSTRAINT [Piece_createdAtCanvasId_fkey] FOREIGN KEY ([createdAtCanvasId]) REFERENCES [dbo].[Canvas]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
