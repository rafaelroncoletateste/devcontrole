"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FiSearch, FiX } from "react-icons/fi";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o e-mail do cliente")
    .min(1, "O e-mail é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>({
    id: "1",
    name: "Rafael",
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("api/customer", {
      params: {
        email: data.email,
      },
    });

    if (!response.data) {
      setError("email", {
        type: "customer",
        message: "Ops, cliente não foi encontrado!",
      });
      return;
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 ">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>

      <main className="flex flex-col">
        {customer ? (
          <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado: </strong> {customer.name}
            </p>
            <button
              onClick={handleClearCustomer}
              className="h-11 px-2 flex items-center justify-center rounded"
            >
              <FiX size={30} color="#ff2929" />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleSearchCustomer)}
            className="bg-slate-200 py-6 px-2 rounded border-2"
          >
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente"
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 flex flex-row gap-4 px-2 h-11 items-center justify-center text-white font-bold rounded"
              >
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket />}
      </main>
    </div>
  );
}
