all:
	@docker compose up -d --build

up: all

down:
	@docker compose down

clean:
	@docker image rm postgres
	# @docker image rm -f $$(docker images -q)

fclean: down clean

re: fclean all