'use client';

import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  cpf: string;
  email: string;
};

interface Employee {
  id: string;
  salary: number;
  companyId: string;
  UserId: string;
}

export default function LoanRequestPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState(50);
  const [installments, setInstallments] = useState(4);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { users } = useAppContext();

  useEffect(() => {
    if (!selectedUser) return;
    console.log('selectedUser atualizado:', selectedUser);
    axios.get(`http://localhost:3333/employee/user/${selectedUser?.id}`).then((response) => {
      setEmployee(response.data);
    });
  }, [selectedUser]);

  const handleSubmit = async () => {
    if (!selectedUser) {
      alert('Selecione um usuário primeiro.');
      return;
    }

    const requestData = {
      employeeId: employee?.id,
      amount,
      parcelAmount: installments,
    };

    await axios
      .post('http://localhost:3333/loan', requestData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message || 'Failed to post');
      });

    console.log('Loan Request:', requestData);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-teal-700 px-6 py-3 text-white">
        <div className="flex items-center gap-2">
          <Image src="/credifit_br_logo.jpeg" alt="Credifit" height={24} width={24} />
          <span className="font-bold font-mono text-2xl">Credifit</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="rounded bg-teal-600 px-2 py-1 text-sm focus:outline-none"
            onChange={(e) => setSelectedUser(e.target.value ? JSON.parse(e.target.value) : null)}
          >
            <option value="">Selecionar usuário</option>
            {users ? (
              users.map((user) => (
                <option key={user.id} value={JSON.stringify(user)}>
                  {user.name}
                </option>
              ))
            ) : (
              <option value="">Selecionar usuário</option>
            )}
          </select>
        </div>
      </header>

      <main className="mt-8 flex flex-1 flex-col items-center px-4">
        <nav className="mb-4 w-full max-w-lg text-sm text-gray-500">
          Home / <span className="font-medium text-gray-700">Crédito Consignado</span>
        </nav>

        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-md">
          <h1 className="mb-4 text-xl font-semibold text-gray-800">Simular Empréstimo</h1>

          <div className="mb-6 flex items-start rounded-lg bg-orange-100 p-4">
            <div className="mr-3"></div>
            <p className="text-sm text-gray-700">
              Você possui saldo para Crédito Consignado. Faça uma simulação! Digite quanto você
              precisa e escolha o número de parcelas.
            </p>
          </div>

          <div className="mb-6 text-center text-2xl font-semibold text-gray-700">
            R$ <span>{amount.toLocaleString('pt-BR')}</span>
          </div>

          <input
            type="range"
            min="50"
            max={employee?.salary ? employee.salary * 0.35 : 50}
            step="50"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mb-6 w-full accent-teal-600"
          />

          <div className="mb-6 border-gray-800">
            <label htmlFor="installments" className="block text-sm font-medium text-gray-700 mb-1">
              Parcelas
            </label>
            <input
              id="installments"
              type="number"
              min="1"
              max="4"
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full rounded-md text-black p-2 focus:ring focus:ring-teal-200"
            />
          </div>

          <div className="flex justify-between">
            <button className="rounded-full border border-teal-600 px-6 py-2 text-teal-600 transition hover:bg-teal-50">
              Voltar
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-full bg-teal-700 px-6 py-2 text-white transition hover:bg-teal-800"
            >
              Simular empréstimo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
