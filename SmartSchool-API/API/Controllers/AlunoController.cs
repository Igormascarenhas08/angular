using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository _repo;
        public AlunoController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllAlunosAsync(true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(500, ex.Message);
            }

        }

        [HttpGet("search")]
        public async Task<IActionResult> GetComFiltro(
         [FromQuery] int? id,
         [FromQuery] string nome,
         [FromQuery] string sobrenome,
         [FromQuery] string telefone)
        {
            try
            {
                var result = await _repo.GetAlunosFiltradosAsync(id, nome, sobrenome, telefone);

                if (result == null || result.Length == 0)
                {
                    return NotFound("Nenhum aluno encontrado com os filtros fornecidos.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro inesperado: {ex.Message}");
            }
        }


        [HttpGet("{AlunoId}")]
        public async Task<IActionResult> GetByAlunoId(int AlunoId)
        {
            try
            {
                var result = await _repo.GetAlunoAsyncById(AlunoId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return this.StatusCode(500, ex.Message);
            }

        }

        [HttpGet("ByDisciplina/{disciplinaId}")]
        public async Task<IActionResult> GetByDisciplinaId(int disciplinaId)
        {
            try
            {
                var result = await _repo.GetAlunosAsyncByDisciplinaId(disciplinaId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> post(Aluno model)
        {
            try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }
                else
                {
                    return BadRequest("Erro não esperado");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }



        }

        [HttpPut("{alunoId}")]
        public async Task<IActionResult> put(int alunoId, Aluno model)
        {
            try
            {
                var aluno = await _repo.GetAlunoAsyncById(alunoId, false);

                if (aluno == null)
                {
                    return NotFound();
                }

                _repo.Update(model);


                if (await _repo.SaveChangesAsync())
                {
                    return Ok(model);
                }

                return BadRequest("Erro Inesperado");


            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{alunoId}")]
        public async Task<IActionResult> delete(int alunoId)
        {
            var aluno = await _repo.GetAlunoAsyncById(alunoId, false);

            if(aluno == null)
            {
                return NotFound();
            }

            _repo.Delete(aluno);

            if(await _repo.SaveChangesAsync())
            {
                return Ok(new {mensage = "Deletado"});
            }


            return BadRequest("Erro Inesperado");
        }
    }
}
