class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    min() {
        //current recebe o valor de root 
        let current = this.root
        //compara se current é nulo
        if (current == null)
            //retorna nulo
            return null
        //enquanto o valor da esquerda for diferente de nulo
        while (current.left != null)
            //cureent recebe o valor da esquerda
            current = current.left
        //retorna o conteúdo de current
        return current.content
    }

    //exibe o maior valor da arvore
    max() {
       //current recebe o valor de root
        let current = this.root
       //compara se current é nulo
        if (current == null)
           //se current for nulo, retorna nulo
            return null
        // enquanto current.right for diferente de nulo
        while (current.right != null)
          //current recebe o valor da direita
            current = current.right
       //retorna o conteúdo de current
        return current.content
    }

    //insere o elemento da arvore
    insert(element) {
        //root recebe o valor que foi inserido
        this.root = this.insertNode(this.root, element)
    }

    //insere o nó na árvore
    insertNode(rootNode, element) {
        //compara se o valor do nó é nulo
        if (rootNode == null)
            //se o nó for nulo retorna o elemento inserido
            return new Node(element)
        //se o elemento for maior do que o nó de referência, insere o elemento na direita
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        //se o elemento for menor do que o nó de referência, insere o elemento na esquerda
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        //retorna o nó
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {
        //mostra primeiro a esquerda
        this.inOrderVisitor(this.root, callback)
    }

    inOrderVisitor(node, callback) {
       // se o nó for nulo
        if (node == null)
          //retorna o valor do nó da esquerda
            return
        this.inOrderVisitor(node.left, callback)
        //executa a função callback e mostra o nó no conteúdo
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
       //retorna o valor da raiz
        this.preOrderVisitor(this.root, callback)
    }

    preOrderVisitor(node, callback) {
        //compara se o nó é nulo 
        if (node == null)
            return 
        //primeiro mostra o conteúdo da raiz 
        callback(node.content)
        // depois mostra o conteúdo da esquerda
        this.preOrderVisitor(node.left, callback)
        //por último mostra o conteúdo da direita
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }

    postOrderVisitor(node, callback) {
        //compra se o nó é nulo
        if (node == null)
            return
        //mostra o valor da direita
        this.postOrderVisitor(node.left, callback)
       //mostras o valor da esquerda
        this.postOrderVisitor(node.right, callback)
        //executa a função callback e mostra o conteúdo do nó
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda

   //busca se o valor que foi inserido está na árvore
    search(value) {
        return this.searchVisitor(this.root, value)
    }

    searchVisitor(node, element) {
       //se é nulo o elemento não existe e retorna falso
        if (node == null)
            return false
        // se é igual ao conteúdo achou o elemento 
        if (node.content == element)
            return true;
        //se for maior que o conteúdo, procure na direita, caso não ache,procure na esquerda
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }

    // remove um elemento da árvore
    removeVisitor(node, value) {
        //verifica se o conteúdo é igual ao valor que foi foi escolhido para ser removido
        if (node.content == value) {
            //verifica se o valor do nó da esquerda é igual ao valor do nó da direita
            if (node.left == node.right) {
                //nao tem filhos - Grau 0
                //retorna nulo
                return null
            //verifica se o valor do nó da direita é nulo
            } else if (node.right == null) {
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                //retorna o nó da esquerda
                return node.left
            //verifica se o valor do nó da direita é nulo
            } else if (node.left == null) {
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
               //retorna o nó da direita
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                //newRoot recebe o nó da direita
                const newRoot = node.right
                //current recebe o nó da direita
                let current = node.right;
                //enquanto current.left for diferente de nulo current recebe o nó da direita
                while (current.left != null)
                    current = current.left
                current.left = node.left
                //retorna newRoot
                return newRoot;
            }
        // verifica se o valor é menor do que conteúdo do nó
        } else if (value < node.content) {
            //remove o valor do nó da da esquerda
            node.left = this.removeVisitor(node.left, value)
        } else {
            //remove o valor do nó da direita
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    height() {
        return this.heightVisitor(this.root)
    }

    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
    size() {
        return this.sizeVisitor(this.root)
    }

    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}
