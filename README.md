# RF - requisitos funcionais

- [] O usuário deve poder criar um novo usuário
- [] O usuário deve poder ser identificado entre as requisições
- [] O usuário deve poder registrar uma nova refeição
- [] O usuário deve poder informar o nome da refeição
- [] O usuário deve poder informar a descrição da refeição
- [] O usuário deve poder informar a data e hora da refeição
- [] O usuário deve poder informar se a refeição está dentro ou fora da dieta
- [] O usuário deve poder editar uma refeição
- [] O usuário deve poder apagar uma refeição
- [] O usuário deve poder listar todas as refeições cadastradas
- [] O usuário deve poder visualizar uma refeição específica
- [] O usuário deve poder visualizar métricas das suas refeições
- [] O sistema deve poder informar a quantidade total de refeições registradas
- [] O sistema deve poder informar a quantidade total de refeições dentro da dieta
- [] O sistema deve poder informar a quantidade total de refeições fora da dieta
- [] O sistema deve poder informar a melhor sequência de refeições dentro da dieta

# RNF - requisitos não funcionais

- [] A aplicação deve disponibilizar uma API para consumo por cliente web ou mobile
- [] A API deve retornar os dados de forma estruturada para integração com front-end
- [] A aplicação deve garantir persistência dos dados dos usuários e refeições
- [] A aplicação deve permitir identificação do usuário entre as requisições por mecanismo de sessão, cookie ou similar
- [] O código deve ser versionado e disponibilizado em um repositório GitHub para entrega

# RN - regras de negócio

- [] As refeições devem estar obrigatoriamente relacionadas a um usuário
- [] O usuário só pode visualizar as refeições que ele criou
- [] O usuário só pode editar as refeições que ele criou
- [] O usuário só pode apagar as refeições que ele criou
- [] As métricas devem ser calculadas com base apenas nas refeições do próprio usuário
- [] A melhor sequência de refeições dentro da dieta deve considerar apenas refeições consecutivas dentro da dieta
- [] Uma refeição deve informar se está dentro ou fora da dieta