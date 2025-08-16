 # CSS Questions <!-- omit from toc -->

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Q. Explain the box model in CSS?](#q-explain-the-box-model-in-css)
- [Q. What are CSS variables?](#q-what-are-css-variables)
- [Q. What are the different `position` values an element can take?](#q-what-are-the-different-position-values-an-element-can-take)
- [Q. What is CSS Flexbox and its use cases?](#q-what-is-css-flexbox-and-its-use-cases)
- [Q. What is CSS Grid and its use cases?](#q-what-is-css-grid-and-its-use-cases)
- [Q. When to use css grid and flexbox?](#q-when-to-use-css-grid-and-flexbox)
- [Q. What is mobile-first? Can you explain the difference between coding a website to be responsive versus using a mobile-first strategy](#q-what-is-mobile-first-can-you-explain-the-difference-between-coding-a-website-to-be-responsive-versus-using-a-mobile-first-strategy)
- [Q. What is CSS transform?](#q-what-is-css-transform)
- [Q. What is CSS transition?](#q-what-is-css-transition)
- [Q. What is CSS animation?](#q-what-is-css-animation)
- [Q. What is the difference between transition and animation in CSS?](#q-what-is-the-difference-between-transition-and-animation-in-css)
- [Q. What is CSS theming?](#q-what-is-css-theming)
- [Q. What are some best practices for creating CSS themes?](#q-what-are-some-best-practices-for-creating-css-themes)

<br>

## Q. Explain the box model in CSS?

The box model in CSS refers to the concept that every HTML element is treated as a rectangular box that has content, padding, borders, and margins.

* Content: The content of the box is the actual content of the HTML element, such as text or images.

* Padding: The padding of the box is the space between the content and the border. The padding is transparent and is used to create space around the content.

* Border: The border of the box surrounds the content and padding. The border can have different styles, such as color, width, and style (e.g. solid, dotted, etc.).

* Margin: The margin of the box is the space outside the border. The margin is used to create space between elements.

The size and position of the box are determined by the content, padding, borders, and margins, and can be controlled using CSS properties such as `width`, `height`, `padding`, `border`, and `margin`.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are CSS variables?
CSS variables, also known as CSS custom properties, are values that can be assigned to specific CSS properties. CSS variables are similar to variables in programming languages and allow you to store values that can be reused throughout a stylesheet.

CSS variables are declared using the `--` syntax followed by a name, and they can be used in a CSS declaration by using the `var()` function. For example:

```css
:root {
  --primary-color: #ff0000;
}

.header {
  background-color: var(--primary-color);
}
```

In this example, a CSS variable named `--primary-color` is declared with the value `#ff0000`. This variable can then be used as the value for the `background-color` property of the `.header` class.

CSS variables offer several benefits, such as:

* Reusability: By using variables, you can define values in one place and reuse them throughout a stylesheet.

* Maintainability: By using variables, you can make global changes to your stylesheet by changing a single value.

* Improved organization: By grouping related values together in variables, you can make your stylesheet easier to read and maintain.

Overall, CSS variables are a useful tool for making your stylesheets more efficient and manageable.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are the different `position` values an element can take?

What are the different `position` values an element can take?

* **Static**

`position: static` is the default value. An element with `position: static` is not positioned in any special way.

* **Relative**

`position: relative` behaves the same as static unless you add some extra properties. Setting the `top`, `right`, `bottom` and `left` properties of a relatively-positioned element will cause it to be adjusted away from its normal position. This means that the new position (determined by `top`, `right`, `bottom`, `left`) is relative to the original (static) position.

```css
#something {
  position: relative; /* i'm gonna move this element from its original spot */
  top: -10px; /* push this 10px up to the top */
  left: 20px; /* push this 20px to the right */
}
```

* **Fixed**

A fixed element is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled (think of a modal window). As with relative, the `top`, `right`, `bottom`, and `left` properties are used.

* **Absolute**

`position: absolute` behaves like `fixed` except relative to the nearest positioned ancestor instead of relative to the viewport. If an absolutely-positioned element has no positioned ancestors, it uses the document body, and still moves along with page scrolling. Remember, a "positioned" element is one whose position is anything except `static`.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS Flexbox and its use cases?

* CSS Flexbox is a layout mode in CSS that makes it easy to create flexible and responsive designs. It provides a way to align and distribute space among items in a container, allowing for more complex and dynamic layouts.
* Some use cases for CSS Flexbox include creating flexible and responsive navigation menus, building grid-like layouts, and creating vertical and horizontal centering. Flexbox can also be used to create dynamic and responsive page elements such as cards, galleries, and carousels.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS Grid and its use cases?

* CSS Grid is a layout mode in CSS that provides a way to create two-dimensional grid-based layouts. It allows you to create complex grid-based designs with rows and columns, making it easier to control the size and position of elements on the page.
* Some use cases for CSS Grid include creating page layouts, building grid-based interfaces such as portfolios and galleries, and creating dynamic and responsive page elements. CSS Grid can also be used to create multi-column text layouts and to control the size and position of elements within the grid.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. When to use css grid and flexbox?

* A core difference between CSS Grid and Flexbox is that — CSS Grid’s approach is **layout-first** while Flexbox’ approach is **content-first**. If you are well aware of your content before making layout, then blindly opt for Flexbox and if not, opt for CSS Grid.
* Flexbox layout is most appropriate to the components of an application (as most of them are fundamentally linear), and **small-scale** layouts, while the Grid layout is intended for **larger-scale** layouts which aren’t linear in their design.
* If you only need to define a layout as a row or a column, then you probably need flexbox. If you want to define a grid and fit content into it in two dimensions — you need the grid.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is mobile-first? Can you explain the difference between coding a website to be responsive versus using a mobile-first strategy
Making a website responsive means some elements will respond by adapting its size or other functionality according to the device's screen size, typically the viewport width, through CSS media queries, for example, making the font size smaller on smaller devices.

```css
@media (min-width: 601px) {
  .my-class {
    font-size: 24px;
  }
}
@media (max-width: 600px) {
  .my-class {
    font-size: 12px;
  }
}
```

A mobile-first strategy is also responsive, however it agrees we should default and define all the styles for mobile devices, and only add specific responsive rules to other devices later. Following the previous example:

```css
.my-class {
  font-size: 12px;
}

@media (min-width: 600px) {
  .my-class {
    font-size: 24px;
  }
}
```

A mobile-first strategy has 2 main advantages:
* It's more performant on mobile devices, since all the rules applied for them don't have to be validated against any media queries.
* It forces to write cleaner code in respect to responsive CSS rules.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS transform?
* CSS transform is a way to modify the appearance of an element by changing its position, size, shape, or orientation. It allows you to manipulate elements in 2D or 3D space, allowing for a wide range of visual effects.

* The key properties for CSS transforms are: `transform`, `transform-origin`, and `transform-style`.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS transition?
* CSS transition is a way to smoothly change from one style to another over a specified duration of time. It allows an element to change from one state to another in a smooth, gradual way, without any sudden changes.

* The key properties for CSS transitions are: `transition-property`, `transition-duration`, `transition-timing-function`, and `transition-delay`.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS animation?
* CSS animation is a way to animate an element using a series of keyframes. It allows you to specify the styles for the element at different points in time and create complex animations that can be played back in the browser.

* The key properties for CSS animations are: `animation-name`, `animation-duration`, `animation-timing-function`, `animation-iteration-count`, and `animation-direction`.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is the difference between transition and animation in CSS?
The main difference between a transition and an animation in CSS is the **level of control and complexity**. A transition allows you to smoothly change from one style to another over a specified duration of time, whereas an animation allows you to specify the styles for an element at different points in time, creating complex animations.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What is CSS theming?
CSS theming is the process of creating and applying a set of styles to a website or application to give it a consistent, visually appealing look and feel. Themes can be applied to specific elements or to the entire application, and they can include colors, fonts, sizes, and other styling rules.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>

## Q. What are some best practices for creating CSS themes?
Some best practices for creating CSS themes include:
* using variables to store colors and other design elements
* creating a comprehensive set of styles that covers all elements 
* using a modular approach to organizing the styles 
* using media queries to make the theme responsive.

<div align="right">
    <b><a href="#table-of-contents">↥ back to top</a></b>
</div>