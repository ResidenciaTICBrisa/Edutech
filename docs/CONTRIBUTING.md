# Contribuindo para o Projeto

Agradecemos pelo seu interesse em contribuir para o Projeto! Siga os passos abaixo para enviar suas contribuições por meio de pull requests.

## Passo 1: Clone o Repositório

Clone o repositório para o seu ambiente de desenvolvimento local:

`git clone https://github.com/ResidenciaTICBrisa/06_AcompanhamentoEnsinoMedio.git`

## Passo 2: Navegue para a branch de interesse (_docs_ ou _develop_)

`git checkout docs`

## Passo 3: Crie uma branch a partir dessa

É sempre recomendado que você crie uma branch a partir da versão mais recente da branch "mãe". Para isso, ainda na branch atual use o comando:

`git pull`

Em seguida, crie a nova branch:

`git checkout -b [nome da branch]`

### Padrão de nome de branch

O nome da branch deve indicar a qual Issue ela está associada e acompanhada de um resumo mínimo do que será feito. Por exemplo, supondo que a Issue número 6 seja para criar um README. O nome da branch seria:

`feat06-readme` ou `feat06-criacao_readme`

## Passo 4: Faça as alterações na sua branch

### 4.1. Adicionar alterações na área de stash

Selecione quais arquivos você quer salvar as alterações com o comando:

`git add [arquivo1] [arquivo2]` ou simplesmente `git add .` para selecionar todos os arquivos que foram alterados.

### 4.2. Fazer o commit dos arquivos

Com os arquivos no stash, devemos fazer um commit para salvar as alterações no nosso repositório git com o comando:

`git commit -m [mensagem do commit]`

#### Padrão de mensagem de commit

A mensagem de commit deve sempre indicar a qual issue se refere e deve ser descritiva do que foi feito, sendo o mais atômico possível, isto é, não deve haver grandes alterações em um único commit. Deve seguir a norma da língua portuguesa e priorizar o uso de verbos no infinitivo. Um exemplo de mensagem de commit seria:

- Mensagem do Commit 1: `[Feat#06] - Criação do README`
- Mensagem do Commit 2: `[Feat#06] - Adição dos nomes dos membros da equipe`

### 4.3. Subir os arquivos para o repositório remoto

Agora você deve enviar essas alterações para o repositório remoto mediante o comando _push_.

`git push`

**Obs:** Na primeira vez que você tentar fazer isso após criar a branch, você deve também subir a sua branch com o comando:

`git push origin [nome da sua branch]`

Você pode conferir o nome da sua branch com o comando `git branch`

## Passo 5: Solicite a incorporação das suas alterações na branch principal

Ao finalizar as alterações nas sua branch, você terá vários commits (alterações) que devem ser adicionados à branch principal. Para isso, deve ser feito um Pull Request (PR). Com ele, você abre um pedido de "junção" do seu código com o código original.

## Crie um PR

Para realizar um PR, acesse o repositório no GitHub, na aba Pull Requests e clique no botão **New Pull Request**.

1. Você deve especificar qual a branch destino (base) e a branch que você fez as alterações (compare), respectivamente.

![image](https://github.com/ResidenciaTICBrisa/06_AcompanhamentoEnsinoMedio/assets/45673358/cdf5fce3-ed88-4660-b7fe-343c4dc4fed4)

2. Você verá todas os commits que você fez. Aperte no botão verde **Create Pull Request** no canto direito superior.

## Descreva o PR

Você será levado para uma tela em que você poderá dar um título, uma descrição e vários outros detalhes a respeito das suas alterações.

1. Dê um **título**. Ele deve conter o número da Issue e um mínimo resumo do que foi feito. Por exemplo:
   `[Feat#03] - Criação do Documento de Visão`

2. Adicione uma **descrição**, prioritariamente em pontos, do que foi feito. Algo como:

- Criação do arquivo
- Estrutura do arquivo: título, subtítulo, sumário, definição, contexto, bibliografia
- Participantes
- Versionamento

3. Registre que fez o PR, no canto direito no campo "Assignees".

4. Adicione as **labels** que fazem sentido ao seu trabalho. Por exemplo, caso foi documentação, existe a label "documentation".
