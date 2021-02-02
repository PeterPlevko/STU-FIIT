package Visitor;
import Students.Student;

/**
 * this class is part of visitor design pattern
 */
public interface Visitable
{
public Student accept(Visitor visitor);
}
