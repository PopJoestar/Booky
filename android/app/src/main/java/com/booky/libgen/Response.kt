import entities.Book

data class Response(var totalItem: Int = 0, var totalPages: Int = 0, val items: MutableList<Book> = mutableListOf<Book>()) {
    override fun toString(): String {
        return "totalItem: ${totalItem}\ntotalPages:$totalPages\nitems:${items}"
    }
}
