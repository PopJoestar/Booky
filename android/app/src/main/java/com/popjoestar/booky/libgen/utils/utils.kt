package utils
import java.util.regex.Pattern

fun getImageSource(baseUrl: String, suffix: String): String {
    return baseUrl + suffix
}

fun isValidISBN(isbn: String): Boolean {
    val regex =
        "^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$"

    val pattern: Pattern = Pattern.compile(regex)

    return  pattern.matcher(isbn).matches()
}
