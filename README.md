# LostAndFound
  Essa aplicação contém um CRUD que possibilita cadastrar objetos perdidos e encontrados

### Landing (Tela Inicial)
Há uma separação de cores onde o tom vermelho representa perdido e azul representa encontrado
![image](https://user-images.githubusercontent.com/60005589/101373135-61f52f00-388b-11eb-94a7-149ce807d500.png)

### Tela de Cadastro
Nessa tela preenchemos os dados do usuário perdeu/encontrou o objeto, uma foto e no mapa podemos marcar com um clique aonde foi perdido/encontrado.
![image](https://user-images.githubusercontent.com/60005589/101375972-c82f8100-388e-11eb-9ae7-56a4b2d07308.png)
![image](https://user-images.githubusercontent.com/60005589/101376099-ed23f400-388e-11eb-9bc2-3fa7c61de978.png)
![image](https://user-images.githubusercontent.com/60005589/101376254-1e042900-388f-11eb-8cdb-1eecdc5160dc.png)

### Listagem de Items
A listagem de items pode ser filtrada, cada item pode ser removido e há um icone que nos posibilita ver a posição no mapa de onde foi perdido/encontrado
![image](https://user-images.githubusercontent.com/60005589/101373203-73d6d200-388b-11eb-8940-157027d42179.png)
![image](https://user-images.githubusercontent.com/60005589/101373359-9a950880-388b-11eb-8f0e-be482fff4262.png)


### Iniciando aplicação
Ambas aplicações são iniciadas a partir do comando (nas pastas backend e frontend)

```sh
$ yarn start
```

### Dificuldades encontradas
- Dados inicializados com a aplicação : As categorias são preenchidas ao inciar a aplicação através de uma lógica utilizando ORM e JavaScript. 
- Persistencia de Dados : Foi utilizados o SQLite por ser uma aplicação simples.
- Tratativas de exceções : Foi criado uma tratativa para erros assincronos.
- Upload de arquivos : Resolvidos com multer(backend) e react-dropzone(frontend)
- Mapa em um Modal : O mapa apresentava bugs ao ser gerado em um modal, foi resolvido com lógicas no css.

### Estrutura e Conceitos
 - Conceitos aplicados : SOLID
 - Estrutura Utilizada : MVC
 
### Artes da aplicação
Artes fornecidas por **Rodrigo Fernandes**

# Tecnologias Utilizadas

## Backend
 - Express
 - SQLite3
 - Multer
 - TypeORM
 - TypeScript
 
 ## Frontend
  - React
  - TypeScript
  - Axios
  - Router DOM

# To Do
  - Filtro de objetos encontrados no raio (em km)
  - Update de items
