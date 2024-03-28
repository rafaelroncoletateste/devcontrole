import { Container } from "@/components/container";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  const customers = await prismaClient.costumer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customer = formData.get("customer");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form action={handleRegisterTicket} className="flex flex-col mt-6">
          <label htmlFor="#" className="mb-1 font-medium text-lg">
            Nome do chamado
          </label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
          />

          <label htmlFor="#" className="mb-1 font-medium text-lg">
            Descreva o chamado
          </label>
          <textarea
            placeholder="Descreva o problema"
            required
            name="description"
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
          ></textarea>

          {customers.length !== 0 && (
            <>
              <label htmlFor="#" className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboad/customer/new">
              Você ainda não tem nenhum cliente,
              <span className="text-blue-500 font-medium">Cadastre aqui</span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
