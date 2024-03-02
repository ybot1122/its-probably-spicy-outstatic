export default async function Page() {
  async function createRecipe(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };

    // mutate data
    // revalidate cache
  }

  return (
    <div>
      <h1>Hello</h1>

      <form action={createRecipe}>
        ...<button type="submit">Make a Post</button>
      </form>
    </div>
  );
}
