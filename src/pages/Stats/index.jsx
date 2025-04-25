import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import evoloading from "../../assets/evoloading.gif"
import evolution from "../../assets/evolution.svg"
import { toWords } from 'number-to-words'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
}

const Stats = () => {
  const [statsData, setStatsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      const endDate = new Date().toISOString().split("T")[0]
      const url = `https://sourceforge.net/projects/evolution-x/files/stats/json?start_date=2019-03-19&end_date=${endDate}`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }
        const data = await response.json()
        setStatsData(data)
      } catch (err) {
        console.error("Stats fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }
    return date.toLocaleString("en-US", options)
  }

  if (loading) {
    return <img className="mx-auto" src={evoloading} alt="Loading..." />
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]"
    >
      <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
        <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="Logo" />
        <span className="evoxhighlight">Stats</span>
      </div>

      {!loading && !error && statsData && (
        <div className="text-white text-center space-y-12">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
          >
            <p className="text-2xl font-semibold evoxhighlight">Total Downloads</p>
            <p className="text-lg mt-2">
              In total, Evolution X has been downloaded{" "}
              <span className="text-3xl font-bold evoxhighlight">
                {statsData.total.toLocaleString()}
              </span>{" "}
              times!
            </p>
            <p className="text-lg mt-2">
              That's{" "}
              <span className="text-lg mt-2 evoxhighlight">
                {toWords(statsData.total)}
              </span>{" "}
              times!
            </p>
          </motion.div>
          <div className="flex justify-between space-x-4">
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Countries</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {statsData.countries?.map(([country, count], index) => (
                    <li key={index} className="text-lg">
                      <span className="font-semibold">{country}</span>:{" "}
                      {count.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Operating Systems</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {statsData.oses?.map(([os, count], index) => (
                    <li key={index} className="text-lg">
                      <span className="font-semibold">{os}</span>:{" "}
                      {count.toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
          >
            <p className="text-2xl font-semibold evoxhighlight">Operating Systems by Country</p>
            <div className="mt-4 max-h-40 overflow-y-scroll">
              <ul className="space-y-2">
                {Object.entries(statsData.oses_by_country)?.map(
                  ([country, oses], index) => (
                    <li key={index} className="text-lg">
                      <span className="font-semibold evoxhighlight">{country}</span>:{" "}
                      <ul className="ml-4">
                        {Object.entries(oses).map(([os, count], idx) => (
                          <li key={idx} className="text-lg">
                            <span className="font-semibold">{os}</span>:{" "}
                            {count.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </div>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
          >
            <p className="text-2xl font-semibold evoxhighlight">Stats Information</p>
            <div className="mt-4 space-y-2">
              <p className="text-lg">
                <span className="font-semibold evoxhighlight">Stats Updated:</span>
                <br />
                <span>
                  {formatDate(statsData.stats_updated)}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-semibold evoxhighlight">Start Date:</span>
                <br />
                <span>
                  {formatDate(statsData.start_date)}
                </span>
              </p>
              <p className="text-lg">
                <span className="font-semibold evoxhighlight">End Date:</span>
                <br />
                <span>
                  {formatDate(statsData.end_date)}
                </span>
              </p>
            </div>
          </motion.div>
          <div className="mt-8 text-sm text-gray-400 text-center">
            <p>
              Download statistics are provided by{" "}
              <a
                href="https://sourceforge.net/projects/evolution-x/"
                className="evoxhighlight"
                target="_blank"
                rel="noopener noreferrer"
              >
                SourceForge
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Stats
