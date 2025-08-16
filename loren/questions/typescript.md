 # Typescript Questions <!-- omit from toc -->

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Q. What is an abstract class in TypeScript?](#q-what-is-an-abstract-class-in-typescript)
- [Q. What are the main differences between using an abstract class and implementing an interface, and when is it appropriate to use each in a TypeScript project?](#q-what-are-the-main-differences-between-using-an-abstract-class-and-implementing-an-interface-and-when-is-it-appropriate-to-use-each-in-a-typescript-project)
- [Q. What is the purpose of using the "?" symbol in TypeScript, and what does it indicate about the type of a variable?](#q-what-is-the-purpose-of-using-the--symbol-in-typescript-and-what-does-it-indicate-about-the-type-of-a-variable)
- [Q. What is the difference between the "undefined" and "void" types in TypeScript?](#q-what-is-the-difference-between-the-undefined-and-void-types-in-typescript)
- [Q. What is the "never" type in TypeScript and when is it used?](#q-what-is-the-never-type-in-typescript-and-when-is-it-used)
- [Q. What is an interface in TypeScript and what is it used for?](#q-what-is-an-interface-in-typescript-and-what-is-it-used-for)
- [Q. What is an enum in TypeScript and what is it used for?](#q-what-is-an-enum-in-typescript-and-what-is-it-used-for)
- [Q. What is a type alias in TypeScript and what is it used for?](#q-what-is-a-type-alias-in-typescript-and-what-is-it-used-for)
- [Q. In what situations would you use an interface versus a type alias in TypeScript?](#q-in-what-situations-would-you-use-an-interface-versus-a-type-alias-in-typescript)
- [Q. What is the purpose of Utility Types in TypeScript, and how do they aid in type manipulation and creation?](#q-what-is-the-purpose-of-utility-types-in-typescript-and-how-do-they-aid-in-type-manipulation-and-creation)
- [Q. What are Generics in TypeScript and how do they work?](#q-what-are-generics-in-typescript-and-how-do-they-work)
- [Q. When working with generics in TypeScript, how we can describe type params that have more specific requirement than `any`?](#q-when-working-with-generics-in-typescript-how-we-can-describe-type-params-that-have-more-specific-requirement-than-any)
- [Q. What are Decorators in TypeScript and how do they work?](#q-what-are-decorators-in-typescript-and-how-do-they-work)
- [Q. How does a Decorator modify the behavior of a class or property in TypeScript?](#q-how-does-a-decorator-modify-the-behavior-of-a-class-or-property-in-typescript)

<br>


## Q. What is an abstract class in TypeScript?

An abstract class in TypeScript is a class that cannot be instantiated on its own, but it can be used as a base class for other classes. Abstract classes provide a way to define common properties and methods that can be shared across multiple classes, while still allowing for customization and inheritance.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are the main differences between using an abstract class and implementing an interface, and when is it appropriate to use each in a TypeScript project?

Abstract classes and interfaces are both used in object-oriented programming to define contracts or agreements for classes. However, they serve different purposes and have different use cases.

Abstract classes are used to provide a base implementation for subclasses. Abstract classes can contain both abstract and concrete methods, meaning they can define some methods with a default implementation, and leave others for the subclasses to implement. This allows you to enforce common behavior and structure in subclasses, while still allowing for customization.

Interfaces, on the other hand, are used to define a contract for classes. Interfaces can only contain abstract methods, meaning they only define the signatures of methods without providing any implementation. Classes that implement an interface must provide an implementation for all of the interface's methods. Interfaces are used to define a common set of properties and methods that classes can implement.

In summary, you would use an abstract class when you want to provide a common implementation for subclasses, while you would use an interface when you want to define a common set of properties and methods for classes to implement.

It's also worth noting that TypeScript supports multiple inheritance, meaning a class can inherit from multiple interfaces, but it can only inherit from a single class.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is the purpose of using the "?" symbol in TypeScript, and what does it indicate about the type of a variable?

 The "?" symbol in TypeScript indicates that a variable is nullable, meaning it can either have a value or be null. This is used to indicate that a variable is optional, and it's a way to express that a value may not always be present.

 Example:
 ```ts
 interface People {
    name: string
    age?: number
 }

 function add (a: number, b?: number) {
    return a + (b ?? 0)
 }
 ```

 <div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is the difference between the "undefined" and "void" types in TypeScript?

The "undefined" type in TypeScript represents the absence of a value, while the "void" type is used to indicate that a function does not return a value. In other words, "undefined" is used to describe a value that is not present, while "void" is used to describe the type of a value that a function returns when it doesn't return anything.

Example:
```ts
function getData(): void {
    return 42 // error: Type 'number' is not assignable to type 'void'.
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is the "never" type in TypeScript and when is it used?
`never` is a type that describes no possible value allowed by the system. It's useful when using with exhaustive conditionals. For example:
```ts
class Car {
  drive() {
    console.log("vroom")
  }
}
class Truck {
  tow() {
    console.log("dragging something")
  }
}
type Vehicle = Truck | Car
 
let myVehicle: Vehicle = obtainRandomVehicle()
 
// The exhaustive conditional
if (myVehicle instanceof Truck) {
  myVehicle.tow() // Truck
} else if (myVehicle instanceof Car) {
  myVehicle.drive() // Car
} else {
  // NEITHER!
  const neverValue: never = myVehicle
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is an interface in TypeScript and what is it used for?

An interface in TypeScript is a way to describe the structure of an object. It's used to define a set of properties and methods that a class or object should have. This allows you to define a contract for the shape of an object, and ensure that objects conform to the contract at runtime.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is an enum in TypeScript and what is it used for?

An enum in TypeScript is a way to define a set of named constants. It's used to create a type with a fixed set of possible values, which can be helpful in situations where you need to represent a limited set of options, such as the days of the week or the months of the year. Enums provide a way to make your code more readable and maintainable by making it easier to understand what the different possible values are for a given type.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is a type alias in TypeScript and what is it used for?

A type alias in TypeScript is a way to give a name to a type. It allows you to create a new name for a complex type, making it easier to use and understand in your code. Type aliases can be used to simplify complex types, or to define types that are used frequently in your code.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. In what situations would you use an interface versus a type alias in TypeScript?
In many situations, either a type alias or an interface would be perfectly fine, however…
* If you need to define something other than an object type (e.g., use of the `|` union type operator), you must use a type alias
* If you need to define a type to use with the `implements` heritage term, it’s best to use an interface
* If you need to allow consumers of your types to augment them, you must use an interface.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is the purpose of Utility Types in TypeScript, and how do they aid in type manipulation and creation?
Utility Types in TypeScript are a set of built-in type operations that allow you to manipulate and create new types based on existing ones. Some common utility types include:

* Partial: Makes all properties of a type optional.
* Readonly: Makes all properties of a type read-only.
* Required: The opposite of Partial, makes all properties of a type required.
* Pick: Creates a new type that includes only specific properties from an existing type.
* Omit: Creates a new type that omits specific properties from an existing type.
* Exclude: Creates a new type that is the complement of an intersection type.
* Record: Creates a new type that has a set of properties with specific keys and values.
* NonNullable: Creates a new type that excludes null and undefined from a type.

These types can be combined with other types, including interfaces, classes, and enums, to provide more advanced type information to the TypeScript compiler. This makes it easier to catch type-related errors at compile-time, rather than runtime.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are Generics in TypeScript and how do they work?
Generics in TypeScript allow you to write reusable and flexible code that works with any data type. Generics are like variables for types. When you define a generic type, you can specify the type of data that the function, class, or interface should accept, and this type can be any valid data type such as string, number, or object. Generics can be declared using angle brackets (`<>`) and then used in the implementation of the code.

```ts
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {}
  return dict
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. When working with generics in TypeScript, how we can describe type params that have more specific requirement than `any`?
We will use **Generic Constraints**. Generic constraints allow us to describe the “minimum requirement” for a type param, such that we can achieve a high degree of flexibility, while still being able to safely assume some minimal structure and behavior.

The way we define constraints on generics is by using the `extends` keyword.

```ts
interface HasId {
  id: string
}
interface Dict<T> {
  [k: string]: T
}
 
function listToDict<T extends HasId>(list: T[]): Dict<T> {
  const dict: Dict<T> = {}
 
  list.forEach((item) => {
    dict[item.id] = item
  })
 
  return dict
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are Decorators in TypeScript and how do they work?
Decorators in TypeScript are a way to annotate and modify the behavior of a class, property, method, or parameter. They allow us to extend or modify the behavior of the decorated declaration in a clean and concise manner.

```ts
function Logger(target: any) {
  console.log(`Created instance of ${target.name}`);
}

@Logger
class User {
  constructor(public name: string, public age: number) {}
}

const user = new User('John Doe', 30);
```

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. How does a Decorator modify the behavior of a class or property in TypeScript?
A Decorator in TypeScript works by receiving the decorated declaration as a parameter and returning a new implementation that replaces the original declaration. Decorators are applied by prefixing the decorated declaration with the `@` symbol followed by the Decorator's name.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>