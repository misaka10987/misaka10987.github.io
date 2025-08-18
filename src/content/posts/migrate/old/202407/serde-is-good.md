+++
title = '`serde_derive` amazingly smart'
published = 2024-07-22
+++

Within context like this:

```rust
#[derive(Serialize, Deserialize)]
#[serde(transparent)]
pub struct Id<T: Register> {
    id: &'static str,
    _phantom: PhantomData<T>,
}
```

`serde_derive` intelligently recognizes that there is no need to serialize `_phantom` and the `#[serde(transparent)]` flag simply works.
