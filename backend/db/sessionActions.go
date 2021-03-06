package db

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

// GetSessionByRefreshToken will get a session from the db by a given session string. If nothing
// was found, then it will return an error.
func GetSessionByRefreshToken(ctx context.Context, refreshToken string) (*SessionModel, error) {
	collection := db.Database(DatabaseTypers).Collection(CollectionsSessions)

	filter := bson.M{"refreshToken": refreshToken}

	var session SessionModel
	err := collection.FindOne(ctx, filter).Decode(&session)
	if err != nil {
		return nil, err
	}

	return &session, nil
}

// AddSessions adds a given session to the db. If the user already has a session, then this function
// will delete that session and replace it with this one.
func AddSession(ctx context.Context, session *SessionModel) error {
	collection := db.Database(DatabaseTypers).Collection(CollectionsSessions)

	// delete sessions with the same user
	_, err := collection.DeleteMany(ctx, bson.M{"userid": session.UserID})
	if err != nil {
		return err
	}

	_, err = addDocumentToCollection(ctx, collection, session)
	if err != nil {
		return err
	}

	return nil
}

// Updates a session by id when given one.
func UpdateSessionByRefreshToken(ctx context.Context, refreshToken string, session *SessionModel) error {
	collection := db.Database(DatabaseTypers).Collection(CollectionsSessions)

	filter := bson.M{"refreshToken": refreshToken}
	result := collection.FindOneAndUpdate(ctx, filter, bson.M{"$set": session})
	if result.Err() != nil {
		return result.Err()
	}
	return nil
}

// DeleteSessionByRefreshToken will delete a given session string from the database. If no session
// can be found with this string, then it will throw an error.
func DeleteSessionByRefreshToken(ctx context.Context, refreshToken string) error {
	collection := db.Database(DatabaseTypers).Collection(CollectionsSessions)

	del, err := collection.DeleteOne(ctx, bson.M{"refreshToken": refreshToken})
	if err != nil {
		return err
	} else if del.DeletedCount == 0 {
		return fmt.Errorf("ERROR: Could not delete the document")
	}

	log.Printf("Deleted session with with session string: %v\n", refreshToken)
	return nil
}
