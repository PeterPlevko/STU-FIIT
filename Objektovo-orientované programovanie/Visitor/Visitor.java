package Visitor;
import Students.StudentDaily;
import Students.StudentExtern;

/**
 * this class is part of visitor design pattern
 */
public interface Visitor
{
    public StudentDaily visit(StudentDaily studentdaily);
    public StudentExtern visit(StudentExtern studentextern);
}
