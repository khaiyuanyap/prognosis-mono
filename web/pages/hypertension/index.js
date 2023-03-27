import Head from "next/head"
import {Input} from "../../components/Form"
import {useState} from "react"
import {useRouter} from "next/router"
import Radio from "../../components/Radio"
import Video from "../../components/Video"
import toast, { Toaster } from 'react-hot-toast';

export default function hypertension() {
	const router = useRouter()
	const [name, setName] = useState("")
	const [age, setAge] = useState("22")
	const [sex, setSex] = useState("0")
	const [drinking, setDrinking] = useState("0")
	const [exercise, setExercise] = useState("1")
	const [junk, setJunk] = useState("0")
	const [sleep, setSleep] = useState("0")
	const [bmi, setBmi] = useState("0")
	const [smoking, setSmoking] = useState("0")

	async function handleSubmit(e) {
		e.preventDefault()
		toast.loading('Loading...')
		const res = await fetch("/api/hypertension", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				age: age,
				bmi: bmi,
				drinking: drinking,
				exercise: exercise,
				sex: sex,
				junk: junk,
				sleep: sleep,
				smoking: smoking
			})
		})
		const data = await res.json()
		const risk = data.risk
		const prediction_probability = data.prediction_probability
		toast.dismiss()
		router.push({
			pathname: "/hypertension/result",
			query: {
				name,
				age,
				bmi,
				drinking,
				exercise,
				sex,
				junk,
				sleep,
				smoking,
				risk,
				prediction_probability
			}
		})
	}

	let [isOpen, setIsOpen] = useState(false)

	function closeModal() {
		setIsOpen(false)
	}

	return (
		<div>
			<Toaster />
			<Head>
				<title>Cardiac Health Checkup</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="min-h-screen bg-gray-50 px-5 pt-5">
				<Video
					src="/prognosisvideothings/Hypertension-V1.mov"
					isOpen={isOpen}
					closeModal={closeModal}
				/>

				<div>
					<button
						onClick={() => router.push("/")}
						className="ml-4 mb-4 flex items-center rounded-lg border bg-white px-2 py-1 text-sm font-semibold opacity-80 hover:opacity-60 print:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mr-2 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7 16l-4-4m0 0l4-4m-4 4h18"
							/>
						</svg>
						Go Back
					</button>
				</div>
				<div className="relative flex min-h-screen flex-col justify-center bg-gray-50">
					<div className="relative px-6 pt-10 pb-10">
						<div className="max-w-lg md:mx-auto">
							<form
								className="space-y-4"
								onSubmit={(e) => handleSubmit(e)}
								method="post">
								<div className="mb-4 flex items-center space-x-2">
									<h2 className="text-lg font-semibold">
									Hypertension
									</h2>
									<svg
										onClick={() => setIsOpen(true)}
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 cursor-pointer"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<Input
									type="text"
									pattern="^[A-Za-z ]+$"
									onChange={(e) => setName(e.target.value)}
									placeholder={"Please provide your name"}
									className="flex h-10 w-full items-center rounded-md border-2 border-gray-200 px-4"
								/>
								<Input
									type="number"
									min="0"
									onChange={(e) => setAge(e.target.value)}
									placeholder={"Your age relative to birth date"}
									className="flex h-10 w-full items-center rounded-md border-2 border-gray-200 px-4"
								/>
								<Biologicalsex />
								<Input
									step="0.01"
									type="number"
									min="0"
									onChange={(e) => setBmi(e.target.value)}
									placeholder={"Your BMI (Body Mass Index)"}
									className="flex h-10 w-full items-center rounded-md border-2 border-gray-200 px-4"
								/>
								<Drinkingstatus />
								<Exercise />
								<div className="mt-2 select-none">
									<label className="font-semibold">
										Amount of junk food consumed in average a day
									</label>
									<input
										type="range"
										min="0"
										max="100"
										className="range"
										onChange={(e) => setJunk(e.target.value)}
										value={junk}
									/>
									{junk}
								</div>
								<Sleepquality />
								<Smoking />
								<button
									type="submit"
									className="rounded-md border-2 border-green-500 bg-white px-3 py-1 font-semibold tracking-wide hover:opacity-80">
									Predict
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>
		</div>
	)

	function Biologicalsex() {
		return (
			<Radio
				name0="Female"
				name1="Male"
				label="Biological sex"
				onChange={setSex}
				value={sex}
			/>
		)
	}

	function Drinkingstatus() {
		return (
			<Radio
				name0="False"
				name1="True"
				label="Did you consume alcohol in the past month"
				onChange={setDrinking}
				value={drinking}
			/>
		)
	}

	function Exercise() {
		return (
			<Radio
				name0="False"
				name1="True"
				label="Did you excercise in the past month"
				onChange={setExercise}
				value={exercise}
			/>
		)
	}

	function Sleepquality() {
		return (
			<Radio
				name0="Good"
				name1="Moderate"
				name2="Bad"
				label="Sleep quality"
				onChange={setSleep}
				value={sleep}
			/>
		)
	}

	function Smoking() {
		return (
			<Radio
				name0="False"
				name1="True"
				label="Did you smoke in the past month"
				onChange={setSmoking}
				value={smoking}
			/>
		)
	}
}
