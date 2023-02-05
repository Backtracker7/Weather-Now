function Quote() {

const [quote, setQuote] = useState([]);

useEffect(() => {
    fetch("https://api.quotable.io/random")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        setQuote(data);
    });
})

return(
<div className="quote">
    <h4></h4>
</div>
)

}
export default Quote;