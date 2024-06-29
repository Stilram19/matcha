all:
	@docker compose up -d --build

up: all

down:
	@docker compose down

clean:
	@docker image rm postgres
	@docker volume rm $$(docker volume ls -q)
	# @docker image rm -f $$(docker images -q)

fclean: down clean

re: fclean all