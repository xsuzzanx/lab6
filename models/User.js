class User{
    constructor(id, login, borrowedBooks = []){
        this.id =id;
        this.login = login;
        this.borrowedBooks = borrowedBooks;
    }

    static getAll(){
        return [
            new User(1,'user1'),
            new User(2,'user2'),
            new User(3,'user3'),
            new User(4,'user4'),
            new User(5,'user5'),

        ];
    }
}

User.prototype.borrowBook = function(book) {
    this.borrowedBooks.push(book);
};

User.prototype.returnBook = function(bookId) {
    const index = this.borrowedBooks.findIndex(book => book.id === bookId);
    if (index !== -1) {
        this.borrowedBooks.splice(index, 1);
    }
};

User.prototype.findBorrowedBookById = function(bookId) {
    return this.borrowedBooks.some(book => book.id === bookId);
};

 module.exports =User;
