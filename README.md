# RF - requisitos funcionais

- [x] O usuário deve poder ser identificado automaticamente entre as requisições via cookie (user_id)
- [x] O sistema deve gerar um usuário automaticamente ao primeiro acesso caso não exista cookie
- [x] O usuário deve poder registrar uma nova refeição
- [x] O usuário deve poder informar o nome da refeição
- [x] O usuário deve poder informar a descrição da refeição
- [x] O usuário deve poder informar a data e hora da refeição (campo único: consumed_at)
- [x] O usuário deve poder informar se a refeição está dentro ou fora da dieta
- [x] O usuário deve poder editar uma refeição
- [x] O usuário deve poder apagar uma refeição
- [x] O usuário deve poder listar todas as refeições cadastradas
- [x] O usuário deve poder visualizar uma refeição específica
- [ ] O usuário deve poder visualizar métricas das suas refeições
- [ ] O sistema deve informar a quantidade total de refeições registradas
- [ ] O sistema deve informar a quantidade total de refeições dentro da dieta
- [ ] O sistema deve informar a quantidade total de refeições fora da dieta
- [ ] O sistema deve informar a melhor sequência de refeições dentro da dieta

# RNF - requisitos não funcionais

- [ ] A aplicação deve disponibilizar uma API REST para consumo por cliente web ou mobile
- [ ] A API deve retornar dados em formato JSON
- [ ] A aplicação deve garantir persistência dos dados utilizando SQLite
- [ ] A aplicação deve utilizar Knex para controle de migrations e queries
- [ ] A identificação do usuário deve ser feita via cookies
- [ ] O sistema deve utilizar UUID para identificação dos usuários e refeições
- [ ] O código deve ser versionado em um repositório GitHub

# RN - regras de negócio

- [ ] As refeições devem estar obrigatoriamente relacionadas a um usuário (user_id)
- [ ] O usuário só pode visualizar as refeições que ele criou
- [ ] O usuário só pode editar as refeições que ele criou
- [ ] O usuário só pode apagar as refeições que ele criou
- [ ] As métricas devem ser calculadas apenas com base nas refeições do próprio usuário
- [ ] A melhor sequência de refeições dentro da dieta deve considerar refeições consecutivas
- [ ] Uma refeição deve possuir um campo booleano indicando se está dentro ou fora da dieta
- [ ] Caso não exista um usuário identificado via cookie, o sistema deve criar automaticamente um novo usuário