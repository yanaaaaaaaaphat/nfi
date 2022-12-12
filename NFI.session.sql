create table users (
	user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	full_name VARCHAR (200),
	email VARCHAR (150) UNIQUE NOT NULL,
	password VARCHAR (150) NOT NULL, 
	acc_balance INT NOT NULL DEFAULT 0
)


