package global

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var connection *gorm.DB

func InitPostgreSQL() *gorm.DB {
	credentials := getConnectionCredentials()
	db, err := gorm.Open(postgres.Open(credentials), &gorm.Config{})
	if err != nil {
		log.Fatalln(" AN ERROR HAS OCCURED WHILE CONNECTING TO POSTGRESQL ", err)
	}
	fmt.Println("PostgreSQL connection has been established.")
	connection = db
	return connection
}

func GetPostgresConnection() *gorm.DB {
	return connection
}

func getConnectionCredentials() string {
	server := os.Getenv("SERVER")
	user := os.Getenv("USER_NAME")
	password := os.Getenv("PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("PORT")
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", server, user, password, dbname, port)
}
