import { Container } from "@/components/container";
import Link from "next/link";

export default function NewTicket() {
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

        <form action="#" className="flex flex-col mt-6">
          <label htmlFor="#" className="mb-1 font-medium text-lg">
            Nome do chamado
          </label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
          />

          <label htmlFor="#" className="mb-1 font-medium text-lg">
            Descreva o chamado
          </label>
          <textarea
            placeholder="Descreva o problema"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
          ></textarea>

          <label htmlFor="#" className="mb-1 font-medium text-lg">
            Selecione o cliente
          </label>
          <select className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white">
            <option value="cliente1">Cliente 1</option>
          </select>
        </form>
      </main>
    </Container>
  );
}
