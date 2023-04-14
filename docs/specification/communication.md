---
sidebar_position: 2
---

# Communication

CodeGame uses [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and
[JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) to
keep the client and the server in sync at all times.

## Schema

:::info Prerequisite
The schema is heavily based on the [CGE specification](./cge.md). Naming conventions and available
data types will not be discussed here but still apply.
:::

Every message sent between the client and the server must be a JSON object.
This JSON object must have a `name` property with the name of the event or command as its value.
Any further data is to be provided as properties of the JSON object's `data` property.
If the command or event does not require any more data, the `data` should be set to undefined or not be defined altogether.

### Example

Let's say that we have a CGE file containing the following:

```cge
name greeter
version 0.5

// The `say_hi` event is used to say hi to everyone.
command say_hi {
  // The player ID of the player to greet.
  to: string,
}

// The `hi` event is sent to the player that was greeted.
event hi {
  // The player ID of the player the greetings come from.
  from: string
}
```

Sending the `say_hi` command would look something like this:

```jsonc
{
  "name": "say_hi",
  "data": {
    "to": "FtF43gp05kfGvChCEyBBUMLBKcCId47KmRQLHnLbYqyH6GUnZlpWwl3CxijXxtNz" 
  }
}
```

The other player would receive the `hi` event, which would look like this:

```jsonc
{
  "name": "hi",
  "data": {
    "from": "FGQbkYRPe1B1apC7jJDbMCFhfGY1OWOtEl2GAC69jw64uiP3D7hG9OLPmRZBboHh" 
  }
}
```
