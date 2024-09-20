// Defining a data model.
class MessageOutput {
  message string
}

// Creating a function to extract the resume from a string.
function ExtractInstigation(messages: string) -> MessageOutput {
  client GPT4
  prompt #"
    I am writing a fake argument to make a skit about. i need you to write a fake and hypothetical response to instigate an argument in accordance to this story.
    Friend z is basically trying to instigate.
    "I personally wouldn't let that slide" or "Yo, you gonna take that?", or something in a gen z type of way, make it BRAIN ROT.
    Here are the messages 
    {{messages}}
    Friend z: [what you need to fill in] JSON ONLY. 
    
    Try to make it funny and in a gen z type of way and SPECIFIC to the conversation.
    {{ ctx.output_format }}
  "#
}

// Testing the function with a sample resume.
test testRoast {
  functions [ExtractInstigation]
  args {
    messages #"
      Friend x : Yo you have no friends 
      Friend y : Where yo dad at??? 
      Friend x : I'm your dad
      Friend y : Shut yo pus ahh up
    "#
  }
}
