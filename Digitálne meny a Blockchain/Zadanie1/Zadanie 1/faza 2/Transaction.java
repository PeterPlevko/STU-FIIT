final public class Transaction {
    final int id;

    public Transaction(int id) {
        this.id = id;
    }

    @Override
    /**  @return true ak táto transakcia má rovnaké id ako {@code obj} */
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Transaction other = (Transaction) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        return id;
    }
}