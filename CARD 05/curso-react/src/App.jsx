import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Button from "./components/Button";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

const TASKS_API_URL = import.meta.env.VITE_TASKS_API_URL;

const isValidTodo = (todo) =>
  typeof todo?.id === "number" &&
  typeof todo.title === "string" &&
  typeof todo.completed === "boolean";

const loadTasks = () => {
  try {
    return JSON.parse(localStorage.getItem("tasks")) ?? [];
  } catch {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [isLoadingFromApi, setIsLoadingFromApi] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  async function loadTasksFromApi() {
    setIsLoadingFromApi(true);
    setApiError("");

    try {
      if (!TASKS_API_URL) {
        throw new Error("Defina VITE_TASKS_API_URL no .env (veja o .env.example).");
      }

      const response = await fetch(TASKS_API_URL);

      if (!response.ok) {
        throw new Error("Não foi possível carregar as tarefas da API.");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("A API respondeu num formato inesperado.");
      }

      const apiTasks = data.filter(isValidTodo).map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: "Tarefa importada da API.",
        isCompleted: todo.completed,
      }));

      setTasks((currentTasks) => [
        ...currentTasks,
        ...apiTasks.filter(
          (apiTask) => !currentTasks.some((task) => task.id === apiTask.id)
        ),
      ]);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Erro ao carregar as tarefas."
      );
    } finally {
      setIsLoadingFromApi(false);
    }
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={loadTasksFromApi}
            disabled={isLoadingFromApi}
            className="w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingFromApi
              ? "Carregando tarefas..."
              : "Carregar tarefas da API"}
          </Button>
          {apiError && (
            <p role="alert" className="text-center text-sm text-red-100">
              {apiError}
            </p>
          )}
        </div>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
