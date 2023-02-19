fn main() {

    // let: Assign or reassign value within scope
    // mut: indicate that variable is mutable
    // const: declare a value that doesn't change

    // Mutability
    let mut x = 5;
    println!("Mutability: The value of x is: {}", x);
    x = 6;
    println!("Mutability: The value of x is: {}", x); 

    // Shadowing

    // Shadowing is different from marking a variable as mut, 
    // because we’ll get a compile-time error if we accidentally 
    // try to reassign to this variable without using the let 
    // keyword. By using let, we can perform a few transformations 
    // on a value but have the variable be immutable after those 
    // transformations have been completed.

    let y = 5;
    let y = y + 1;

    {
        let y = y * 2;
        println!("Shadowing: The value of y in the inner scope is: {}", y);
    }

    // The other difference between mut and shadowing is that because 
    // we’re effectively creating a new variable when we use the let 
    // keyword again, we can change the type of the value but reuse 
    // the same name.

    let spaces = "   "; // type &str
    let spaces = spaces.len(); // type usize

    println!("Shadowing: The value of y in the outer scope is: {}", x);
}

// Constants
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;