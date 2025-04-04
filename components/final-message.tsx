"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift } from "lucide-react"
import Link from "next/link"
import { Confetti } from "@/components/confetti"

interface FinalMessageProps {
  onRevealSecret: () => void
}

export default function FinalMessage({ onRevealSecret }: FinalMessageProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullMessage = `Meu amor,

Cada instante ao seu lado é uma nova página na linda história que estamos construindo juntos. Desde o primeiro dia em que nossos caminhos se cruzaram, você trouxe luz, alegria e um significado especial para minha vida de formas que eu nunca imaginei.

Sou imensamente grato por cada sorriso compartilhado, cada aventura vivida e pelos momentos de paz que encontramos um no outro. Cada memória que criamos é um tesouro que guardo com carinho.

Você é minha melhor amiga, minha confidente, meu grande amor. E prometo caminhar ao seu lado, de mãos dadas, em cada capítulo que ainda escreveremos juntos.

Com todo o meu amor,`

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayText(fullMessage.substring(0, index))
      index++
      if (index > fullMessage.length) {
        clearInterval(timer)
        setIsTypingComplete(true)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto p-6 relative min-h-screen flex flex-col items-center justify-center"
    >
      <Confetti />

      <h2 className="text-3xl font-bold text-pink-700 mb-4 text-center">Uma Mensagem Especial Para Você</h2>

      <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-lg p-8 mb-8 max-w-2xl w-full">
        <div className="prose prose-pink mx-auto">
          <div className="whitespace-pre-line text-pink-700 leading-relaxed">
            {displayText}
            <span className={isTypingComplete ? "hidden" : "animate-pulse"}>|</span>
          </div>

          {isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-right font-bold text-pink-600"
            >
              ❤️
            </motion.div>
          )}
        </div>
      </Card>

      {isTypingComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Button
            onClick={onRevealSecret}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2"
          >
            <Gift className="h-5 w-5" />
            Revelar Surpresa Especial
          </Button>

          <Link href="/" className="text-pink-600 hover:underline text-sm">
            Voltar ao início
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}

