import $ from "../scripts/Systemic.js";

/**
 * src/fx/tests/systemic.test.js
 * @fileoverview This file contains tests for the Systemic class,
 * which provides a dynamic object creation system with plugin support.
 */

describe("Systemic", () => {
  it("should create a dynamic object with default properties", () => {
    const obj = $.createDynamicObject();
    expect(obj.value).toBe(null);
    expect(obj.type).toBe("Static");
    expect(obj.proxy).not.toBe(null);
    expect(obj.nodes).toEqual({});
  });

  it("should apply plugins during object creation", () => {
    const obj = $.createDynamicObject("Lit");
    expect(obj.lit).toBe(true);
  });

  it("should wrap the dynamic object with a proxy", () => {
    const obj = $.createDynamicObject();
    expect(obj).toBeInstanceOf(Object);
  });

  it("should dynamically initialize properties via proxy", () => {
    const obj = $.createDynamicObject();
    obj.newProp;
    expect(obj.newProp).toBeInstanceOf(Object);
    expect(obj.nodes.newProp).toBe(obj.newProp);
  });

  it("should resolve paths and create intermediate objects", () => {
    const obj = $.resolvePath("path.to.object");
    expect(obj).toBeInstanceOf(Object);
    expect($.root.path.to.object).toBe(obj);
  });

  it("should set values using $.set()", () => {
    $.set("test.value", "test");
    expect($.val("test.value")).toBe("test");
  });

  it("should set object literals using $.set()", () => {
    $.set("test.object", { a: 1, b: 2 });
    expect($.val("test.object.a")).toBe(1);
    expect($.val("test.object.b")).toBe(2);
  });

  it("should set values using $.val()", () => {
    $.val("test.val", "testVal");
    expect($.val("test.val")).toBe("testVal");
  });

  it("should get values using $.val() with a default value", () => {
    expect($.val("test.notexist", undefined, "default")).toBe("default");
  });

  it("should set and get values on dynamic objects using val()", () => {
    const obj = $.resolvePath("test.dynamic");
    obj.val("dynamicVal");
    expect(obj.val()).toBe("dynamicVal");
    obj.val("newDynamicVal");
    expect(obj.val()).toBe("newDynamicVal");
  });

  it("should automatically add child objects to the parent's nodes property", () => {
    const obj = $.resolvePath("parent");
    obj.child = $.createDynamicObject();
    expect(obj.nodes.child).toBe(obj.child);
  });
});
